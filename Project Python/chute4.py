print("*********************************")
print("Bem Vindo ao jogo de Adivinhação!")
print("*********************************")

numero_secreto = 40

chute = int(input("Digite seu número: "))
print("Você digitou:",chute)

if (numero_secreto == chute):
    print("Você Acertou, Parabéns")

else:
    if (chute > numero_secreto):
        print("Você errou! O seu chute foi maior que o número secreto.")
    else:
        print("Você errou! O seu chute foi menor que o número secreto")

print("Fim De Jogo")