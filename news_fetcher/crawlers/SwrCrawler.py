import feedparser
import json
from typing import List
from models.NewsDto import NewsDto
from .Crawler import Crawler
from models.HeatMapInformation import HeatMapInformation

SWR_ENRICHED_DATA_PATH = "swr_data_enriched.json"
class SwrCrawler(Crawler):
    
    def __init__(self):
        super().__init__()
        self.url = "https://www.swr.de/~rss/index.xml"
        self.source = "SWR"
        with open(SWR_ENRICHED_DATA_PATH) as f:
            self.enriched_news = json.load(f)
            
    def crawl_news(self) -> List[NewsDto]:
        print("Crawling SWR")
        return self.fetch_news_from_feed()
    
    def fetch_news_from_feed(self):
        feed = feedparser.parse(self.url)
        news = []
        for entry in feed.entries:
            print("Analyzing: ", entry)
            enriched_news = self.get_existing_entry_by_id(entry.link)
            if enriched_news is None:
                heat_map_information = self.open_ai_client.fetch_lon_lat_intensity_from_chat_gpt(entry.title + " / " + entry.summary + " / " + str(entry.get("tags", "")))
            else:
                heat_map_information = HeatMapInformation(enriched_news["lon"], enriched_news["lat"], enriched_news["intensity"])
            news.append(
                NewsDto(
                    title=entry.title, 
                    url=entry.link, 
                    date=entry.published, 
                    source=self.source, 
                    lat=heat_map_information.lat, 
                    lon=heat_map_information.lon, 
                    intensity=heat_map_information.intensity,
                    thumbnail_url=self.extract_img(entry.links)
                )
            )
        self.persist_news(news)
        return news
    
    def extract_img(self, links):
        for link in links:
            if "image" in link.get("type"):
                return link.get("href")
        return None
    
    def get_existing_entry_by_id(self, id) -> dict:
        return next((news for news in self.enriched_news if news["url"] == id), None)
    
    def persist_news(self, news):
        self.enriched_news.extend(news)
        with open(SWR_ENRICHED_DATA_PATH, "w") as f:
            json.dump(self.enriched_news, f, cls=self.encoder)
        print("Data enriched and saved to swr_data_enriched.json")