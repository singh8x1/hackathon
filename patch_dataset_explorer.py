import re

with open("src/components/DatasetExplorer.tsx", "r") as f:
    content = f.read()

imports_to_add = """  Database,
  ShoppingCart,
  Music,
  MapPin,
  Film,
  Briefcase,
  Globe,"""

content = re.sub(r'import\s*{\s*Database,', "import { " + imports_to_add, content)

cases = """case 'ShoppingCart': return ShoppingCart;
      case 'Music': return Music;
      case 'MapPin': return MapPin;
      case 'Film': return Film;
      case 'Briefcase': return Briefcase;
      case 'Globe': return Globe;
      case 'Sun': return Sun;"""

content = re.sub(r"case 'Zap': return Zap;.*?case 'Activity': return Activity;", cases, content, flags=re.DOTALL)
content = content.replace("lg:grid-cols-5", "lg:grid-cols-4")

with open("src/components/DatasetExplorer.tsx", "w") as f:
    f.write(content)

