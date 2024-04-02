
from models.NewsDto import NewsDto
from .RssFeedCrawler import RssFeedCrawler
    
class SueddeutscheCrawler(RssFeedCrawler):
    def __init__(self):
        super().__init__("https://rss.sueddeutsche.de/alles", "Süddeutsche Zeitung", "sueddeutsche")
    
    def map_heatmap_information_and_entry_to_news_dto(self, entry, heat_map_information) -> NewsDto:
        return NewsDto(
            title=entry.title, 
            url=entry.link, 
            date=entry.published, 
            source=self.source, 
            lat=heat_map_information.lat, 
            lon=heat_map_information.lon, 
            intensity=heat_map_information.intensity
        )
    
    
    def entry_to_gpt_input(self, entry):
        return entry.title + " / " + entry.dcterms_abstract