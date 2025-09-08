import math
print("Vamos calcular nossas vendas!")
quantidade_pizzas_vendidas = int(input("Quantas pizzas já vendidas? \n"))
valor_venda_pizza = float(input("Qual valor de venda de cada pizza:R$ "))
custo_pizza = float(input("Qual o custo de produção:R$ "))
liquido = valor_venda_pizza - custo_pizza
print(f"O valor do lucro é de:R$ {liquido:.2f}")
meta_financeira_liquida = float(input("Qual a meta de lucro desejada? \n"))
if liquido <= 0:
    print("\n Erro: Valor preço errado")
    print("Ajuste os valores novamente")

else:
    lucro_acumulado = quantidade_pizzas_vendidas * liquido
    lucro_faltante = meta_financeira_liquida - lucro_acumulado
print("\n em resumo teremos: ")
if lucro_faltante <= 0:
    print(f"Meta atingida, Parabéns! chegamos a R$ {meta_financeira_liquida:.2f}.")
    print(f"lucro liquido acumulado: R${lucro_acumulado:.2f}")
else:
    pizza_para_vender = lucro_faltante / liquido
    pizzas_necessarias = math.ceil(pizza_para_vender)
print(f"Para meta falta R${meta_financeira_liquida:.2f}")
print(f"Voce precisa vender {pizzas_necessarias} Pizzas")
print(f"O lucro liquido é R$ {lucro_acumulado:.2f}")
print(f"Lucro liquido faltante é R${lucro_faltante}")