import json
import requests
from .Crawler import Crawler
from typing import List
from models.NewsDto import NewsDto

class TagesschauCrawler(Crawler):
    def crawl_news(self)  -> List[NewsDto]:
        self.crawl()
        self.enrich_news_with_lon_lat()
        return self.filter_unlocated_news()
        
    def crawl(self):
        url = "https://www.tagesschau.de/api2/news/"
        response = requests.get(url)
        data = response.json()
        news = data["news"]

        with open("ard_data.json", "w") as f:
            json.dump(news, f)
            
        print("Data fetched and saved to ard_data.json")
        
        
    def find_news_by_id_in_list(self, news_list, id):
        return next((news for news in news_list if news["sophoraId"] == id), None)

    def enrich_news_with_lon_lat(self):
        with open("ard_data.json") as f:
            data = json.load(f)
            
        already_enriched_news_list = self.already_enriched_news()
        for news in data:
            # check if news is already enriched
            enriched_news = self.find_news_by_id_in_list(already_enriched_news_list, news["sophoraId"])
            if enriched_news is not None:
                news["lon"] = enriched_news["lon"]
                news["lat"] = enriched_news["lat"]
                news["intensity"] = enriched_news["intensity"]
            else:
                # get lon and lat from chatGPT
                useful_text = news["title"] + " " + news.get("firstSentence", "") + json.dumps(news.get("tags", "[]"))
                print('analyzing: ', useful_text)
                heat_map_info = self.open_ai_client.fetch_lon_lat_intensity_from_chat_gpt(useful_text)
        
                news["lon"] = heat_map_info.lon
                news["lat"] = heat_map_info.lat
                news["intensity"] = heat_map_info.intensity
            
        with open("ard_data_enriched.json", "w") as f:
            json.dump(data, f)
        
        print("Data enriched and saved to ard_data_enriched.json")
        return data

    def filter_unlocated_news(self):
        with open("ard_data_enriched.json") as f:
            data = json.load(f)
            
        data = [news for news in data if "lon" in news and "lat" in news and "intensity" in news and news["lat"] != 0 and news["lon"] != 0 and news["lat"] != None and news["lon"] != None and news.get("detailsweb", None) is not None and news.get("teaserImage", None) is not None]
        mappedData = list(map(lambda news: NewsDto(
            lon=news["lon"], 
            lat=news["lat"], 
            intensity=news["intensity"], 
            title= news["title"], 
            date=news["date"], 
            url= news.get("detailsweb", None), 
            thumbnail_url=news["teaserImage"]["imageVariants"]["16x9-512"],
            source="Tagesschau"
            ), data))
        
        print("Data filtered and saved to ard_data_enriched_filtered.json")
        return mappedData

    def already_enriched_news(self):
        with open("ard_data_enriched.json") as f:
            data = json.load(f)
        return data

    def filter_already_collected_news(self) -> List[NewsDto]:
        with open("ard_data_enriched.json") as f:
            old_news = json.load(f)
        
        with open("ard_data.json") as f:
            new_news = json.load(f)
        
        old_news_keys = [news["sophoraId"] for news in old_news]
        return [NewsDto(news) for news in new_news if news["sophoraId"] not in old_news_keys]
