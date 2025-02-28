from PIL import Image
image = Image.open("class_room_100.png").convert("RGBA") 
data = image.getdata()
new_data = []
for item in data:
    r, g, b, a = item 
    if a != 0:
        new_data.append((255, 255, 255, a)) 
    else:
        new_data.append((r, g, b, a))
image.putdata(new_data)
image.save("class_room_100_white.png")