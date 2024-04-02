import feedparser
import json
from typing import List
from models.NewsDto import NewsDto
from .Crawler import Crawler
from models.HeatMapInformation import HeatMapInformation

NDR_ENRICHED_DATA_PATH = "ndr_data_enriched.json"
class NdrCrawler(Crawler):
    
    def __init__(self):
        super().__init__()
        self.url = "https://www.ndr.de/index-rss.xml"
        self.source = "NDR"
        with open(NDR_ENRICHED_DATA_PATH) as f:
            self.enriched_news = json.load(f)
            
    def crawl_news(self) -> List[NewsDto]:
        print("Crawling NDR")
        return self.fetch_news_from_feed()
    
    def fetch_news_from_feed(self):
        feed = feedparser.parse(self.url)
        news = []
        for entry in feed.entries:
            print("Analyzing: ", entry)
            enriched_news = self.get_existing_entry_by_id(entry.link)
            if enriched_news is None:
                heat_map_information = self.open_ai_client.fetch_lon_lat_intensity_from_chat_gpt(entry.title + " / " + entry.description + " / " + entry.mp_keywords)
            else:
                heat_map_information = HeatMapInformation(enriched_news["lon"], enriched_news["lat"], enriched_news["intensity"])
            news.append(
                NewsDto(
                    title=entry.title, 
                    url=entry.link, 
                    date=entry.updated, 
                    source=self.source, 
                    lat=heat_map_information.lat, 
                    lon=heat_map_information.lon, 
                    intensity=heat_map_information.intensity,
                    thumbnail_url=entry.get("mp_data", None)
                )
            )
        self.persist_news(news)
        return news
    
    def get_existing_entry_by_id(self, id) -> dict:
        return next((news for news in self.enriched_news if news["url"] == id), None)
    
    def persist_news(self, news):
        self.enriched_news.extend(news)
        with open(NDR_ENRICHED_DATA_PATH, "w") as f:
            json.dump(self.enriched_news, f, cls=self.encoder)
        print("Data enriched and saved to ndr_data_enriched.json")