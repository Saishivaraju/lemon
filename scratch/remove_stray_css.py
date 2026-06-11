import sys

filepath = "zorvo_dashboard.html"
with open(filepath, "r") as f:
    lines = f.readlines()

# Delete lines 6658 to 6744 (0-indexed: 6657 to 6744)
del lines[6657:6744]

with open(filepath, "w") as f:
    f.writelines(lines)
print("Successfully removed stray CSS.")
