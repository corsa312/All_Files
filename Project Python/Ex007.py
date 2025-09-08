def preco(preco1):
    if preco1 >= 1000:
        return "Caro"
    else:
        return "Barato"

preco1 = float(input("Digite o valor do produto: "))

resultado = preco(preco1)
print(f"O produto está {resultado}.")
