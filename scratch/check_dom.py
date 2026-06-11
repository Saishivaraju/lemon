from html.parser import HTMLParser

class MyParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.sidebar_parent = None
        self.main_parent = None
        
    def handle_starttag(self, tag, attrs):
        self.stack.append(tag)
        attr_dict = dict(attrs)
        if attr_dict.get('class') == 'sidebar':
            self.sidebar_parent = list(self.stack[:-1])
        if attr_dict.get('class') == 'main':
            self.main_parent = list(self.stack[:-1])
            
    def handle_endtag(self, tag):
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()
        else:
            # self-closing or unmatched
            for i in reversed(range(len(self.stack))):
                if self.stack[i] == tag:
                    self.stack = self.stack[:i]
                    break

p = MyParser()
with open('zorvo_dashboard.html', 'r') as f:
    p.feed(f.read())
    
print("Sidebar Parent Path:", p.sidebar_parent)
print("Main Parent Path:", p.main_parent)
if p.sidebar_parent == p.main_parent:
    print("They ARE siblings!")
else:
    print("They are NOT siblings!")
