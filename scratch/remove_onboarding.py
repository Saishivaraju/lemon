import sys

filepath = "zorvo_dashboard.html"
with open(filepath, "r") as f:
    lines = f.readlines()

# Delete lines 7204-7296 (0-indexed: 7203 to 7296)
del lines[7203:7296]

# Delete lines 6658-6784 (0-indexed: 6657 to 6784)
del lines[6657:6784]

with open(filepath, "w") as f:
    f.writelines(lines)
print("Successfully removed onboarding sections.")
