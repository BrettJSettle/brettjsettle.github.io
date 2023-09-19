import requests
from html.parser import HTMLParser
import json
import re

MAIN_URL = "https://stats.sharksice.timetoscore.com/"
DIVISION_URL = MAIN_URL + "display-stats.php?league=1"

response = requests.get(DIVISION_URL)

class SIAHLParser(HTMLParser):
    division = None
    team = None
    in_row = False
    team_link = None
    divisions = {}
    def handle_starttag(self, tag, attrs):
        if tag == 'tr':
            self.in_row = True
        elif tag == "a":
            self.team_link = dict(attrs)['href']
        else:
            return

    def handle_endtag(self, tag):
        if tag == 'tr':
            self.in_row = False
            self.team = None
            self.team_link = None

    def handle_data(self, data):
        if not self.in_row:
            return
        elif 'Division Player Stats' in data:
            return
        elif data.startswith('Adult Division'):
            self.division = data
        elif self.division and self.team_link:
            if self.division not in self.divisions:
                self.divisions[self.division] = {}
            self.team = data.strip()
            cal = get_webcal(self.team_link)
            self.divisions[self.division][self.team] = cal
            self.team_link = None


def get_webcal(url):
    return int(re.search(r'team=(\d+)', url)[1])

parser = SIAHLParser()
parser.feed(response.text)
json.dump(parser.divisions, open('app/public/siahl_calendars.json', 'w'))
