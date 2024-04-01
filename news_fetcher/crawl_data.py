import dotenv
import json
from typing import List 
from crawlers.TagesschauCrawler import TagesschauCrawler
from crawlers.BayrischerRundfunkCrawler import BayrischerRundfunkCrawler
from crawlers.RbbCrawler import RbbCrawler
from crawlers.NdrCrawler import NdrCrawler
from crawlers.WdrCrawler import WdrCrawler
from crawlers.MdrCrawler import MdrCrawler
from crawlers.SwrCrawler import SwrCrawler
from crawlers.Crawler import Crawler
from encoder import SimpleEncoder
dotenv.load_dotenv()

        
if __name__ == "__main__":
    crawlers: List[Crawler] = [
        TagesschauCrawler(), 
        BayrischerRundfunkCrawler(), 
        RbbCrawler(), 
        NdrCrawler(), 
        WdrCrawler(),
        MdrCrawler(),
        SwrCrawler()
        ]
    news = []
    for crawler in crawlers:
        news.extend(list(filter(lambda n: n.lat != 0 and n.lon != 0 and n.lat is not None and n.lon is not None, crawler.crawl_news())))
    
    with open("../src/data/news_data.json", "w") as f:
            json.dump(news, f, cls=SimpleEncoder)