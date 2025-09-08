import random
def gerar_numero_roleta():
    return random.randint(1,60)

numero_sorteado=gerar_numero_roleta()
print(f"O número sorteado é: {numero_sorteado}")