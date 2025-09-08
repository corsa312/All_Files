numero_secreto = 42
chute_str = input("Digite seu número de escolha: ")
chute = int(chute_str)
print("Você digitou ", chute)
if(numero_secreto == chute):
    print("Você acertou, parabéns!!")
else:
    print("Você errou, que pena")
print("Fim do Jogo")