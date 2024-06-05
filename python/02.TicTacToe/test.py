import re

text_to_search = '''
abcdefghijklmnopqurtuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
1234567890

Ha HaHa

MetaCharacters (Need to be escaped):
. ^ $ * + ? { } [ ] \\ | ( )

coreyms.com

321-555-4321
123.555.1234
123*555*1234
800-555-1234
900-555-1234

Mr. Schafer
Mr Smith
Ms Davis
Mrs. Robinson
Mr. T

cat 
mat
pat
bat
'''

sentence = "Start a sentence and then bring it to an end"

pattern = re.compile(r'\bM(r|s|rs)\.?\s[A-Z]\w*')
matches = pattern.finditer(text_to_search)

# with open('data.txt') as f:
#     data = f.read()
#     matchess = pattern.finditer(data)
#     for mach in matchess:
#         print(mach)

counter = 0
for match in matches:
    si = match.span()[0]
    li = match.span()[1]
    print(match)
    # print(text_to_search[si:li])
    counter += 1

print(f"Matches found: [{counter}]")