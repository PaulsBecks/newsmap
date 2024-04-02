import feedparser
import json
from typing import List
from models.NewsDto import NewsDto
from .Crawler import Crawler
from models.HeatMapInformation import HeatMapInformation

class RssFeedCrawler(Crawler):
    def __init__(self, url: str, source: str, key: str):
        super().__init__()
        self.url = url
        self.source = source
        self.key = key
        self.data_path =  f"{self.key}_data_enriched.json"
        self.enriched_news = []
        self.load_enriched_data()
        
    def load_enriched_data(self):
        try:
            with open(self.data_path) as f:
                self.enriched_news = json.load(f)
        except FileNotFoundError:
            print(f"No enriched data found for {self.source}")
            
    def crawl_news(self) -> List[NewsDto]:
        print(f"Crawling {self.source}")
        return self.fetch_news_from_feed()
    
    def fetch_news_from_feed(self):
        feed = feedparser.parse(self.url)
        news = []
        for entry in feed.entries:
            print("Analyzing: ", entry)
            enriched_news = self.get_existing_entry_by_id(entry.link)
            if enriched_news is None:
                heat_map_information = self.open_ai_client.fetch_lon_lat_intensity_from_chat_gpt(
                    self.entry_to_gpt_input(entry)
                )
            else:
                heat_map_information = HeatMapInformation(enriched_news["lon"], enriched_news["lat"], enriched_news["intensity"])
            news.append(
                self.map_heatmap_information_and_entry_to_news_dto(entry, heat_map_information)
            )
        self.persist_news(news)
        return news
    
    def get_existing_entry_by_id(self, id) -> dict:
        return next((news for news in self.enriched_news if news["url"] == id), None)
    
    def persist_news(self, news):
        self.enriched_news.extend(news)
        with open(self.data_path, "w") as f:
            json.dump(self.enriched_news, f, cls=self.encoder)
        print(f"Data enriched and saved to {self.data_path}")
        
    def map_heatmap_information_and_entry_to_news_dto(self, entry, heat_map_information) -> NewsDto:
        pass
    
    def entry_to_gpt_input(self, entry) -> str:
        pass