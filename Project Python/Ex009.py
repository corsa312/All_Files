import random
import string
def letra_aleatoria():
    return random.choice(string.ascii_uppercase)
letra = letra_aleatoria()
print(letra)