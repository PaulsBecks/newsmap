
from models.NewsDto import NewsDto
from .RssFeedCrawler import RssFeedCrawler
    
class TheGuardianCrawler(RssFeedCrawler):
    def __init__(self):
        super().__init__("https://www.theguardian.com/uk/rss", "The Guardian", "the_guardian")
    
    def map_heatmap_information_and_entry_to_news_dto(self, entry, heat_map_information) -> NewsDto:
        return NewsDto(
            title=entry.title, 
            url=entry.link, 
            date=entry.published, 
            source=self.source, 
            lat=heat_map_information.lat, 
            lon=heat_map_information.lon, 
            intensity=heat_map_information.intensity,
            thumbnail_url=self.extract_img(entry.media_content)
        )
    
    
    def entry_to_gpt_input(self, entry):
        return entry.title + " / " + entry.description
    
    def extract_img(self, media_content):
        return media_content[1].get("url") if media_content and len(media_content) > 0 else None