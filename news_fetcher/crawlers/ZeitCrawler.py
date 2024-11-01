
from models.NewsDto import NewsDto
from .RssFeedCrawler import RssFeedCrawler
    
class ZeitCrawler(RssFeedCrawler):
    def __init__(self):
        super().__init__("https://newsfeed.zeit.de/news/index", "ZEIT", "zeit")
    
    def map_heatmap_information_and_entry_to_news_dto(self, entry, heat_map_information) -> NewsDto:
        return NewsDto(
            title=entry.title, 
            url=entry.link, 
            date=entry.published, 
            source=self.source, 
            lat=heat_map_information.lat, 
            lon=heat_map_information.lon, 
            intensity=heat_map_information.intensity,
            thumbnail_url=self.extract_img(entry.links)
        )
    
    def extract_img(self, links):
        for link in links:
            if "image" in link.get("type"):
                return link.get("href")
        return None
    
    def entry_to_gpt_input(self, entry):
        return entry.title + " / " + entry.summary + " / " + str(entry.get("tags", ""))