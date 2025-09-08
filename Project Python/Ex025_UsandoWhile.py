print("*********************************")
print("Bem Vindo ao jogo de Adivinhação!")
print("*********************************")

numero_secreto = 40
total_de_tentativas = 3
rodada = 1

while (rodada <= total_de_tentativas):
    print("Tentativa", rodada, "de", total_de_tentativas)
    chute = int(input("Digite o Seu Número: "))
    print("Você Digitou: ", chute)

    if (numero_secreto == chute):
        print("Você Acertou, Parabéns")

    else:
        if (chute > numero_secreto):
            print("Você errou! O seu chute foi maior que o número secreto.")
        else:
            print("Você errou! O seu chute foi menor que o número secreto")

    print("")
    rodada = rodada + 1

print("Fim Do Jogo!!")