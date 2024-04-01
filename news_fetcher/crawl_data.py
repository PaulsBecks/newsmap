import dotenv
import json
from typing import List 
from crawlers.TagesschauCrawler import TagesschauCrawler
from crawlers.BayrischerRundfunkCrawler import BayrischerRundfunkCrawler
from crawlers.Crawler import Crawler
from encoder import SimpleEncoder
dotenv.load_dotenv()

        
if __name__ == "__main__":
    crawlers: List[Crawler] = [TagesschauCrawler(), BayrischerRundfunkCrawler()]
    news = []
    for crawler in crawlers:
        news.extend(crawler.crawl_news())
    
    with open("../src/data/news_data.json", "w") as f:
            json.dump(news, f, cls=SimpleEncoder)