print("*********************************")
print("Bem Vindo ao jogo de Adivinhação!")
print("*********************************")

numero_secreto = 40

chute_str = int(input("Digite seu número de escolha: "))
print("Você digitou ", chute_str)
chute = int(chute_str)
if(numero_secreto == chute):
    print("Você acertou, parabéns!!")
else:
    print("Você errou, que pena")
print("Fim do Jogo")