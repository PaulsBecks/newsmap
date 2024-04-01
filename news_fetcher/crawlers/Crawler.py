from typing import List
from models.NewsDto import NewsDto
from OpenAIClient import OpenAIClient
from encoder import SimpleEncoder

class Crawler:
    def __init__(self):
        self.open_ai_client = OpenAIClient()
        self.encoder = SimpleEncoder
        
    def crawl_news(self)  -> List[NewsDto]:
        pass
    