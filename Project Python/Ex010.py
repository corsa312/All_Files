def calcular_situacao_aluno():
    notas = []

    for i in range(1, 4):  # Ajusta para 1 a 3 para facilitar a leitura.
        while True:
            try:
                nota = float(input(f"Digite a nota {i}: "))
                if 0 <= nota <= 100:
                    notas.append(nota)
                    break
                else:
                    print("Nota inválida. Digite uma nota entre 0 e 100.")
            except ValueError:
                print("Entrada inválida. Digite um número válido.")

    # Calcula a média das notas
    media = sum(notas) / len(notas)

    # Determina a situação do aluno
    if media >= 60:
        return "Aprovado"
    elif 50 <= media < 60:
        return "Recuperação"
    else:
        return "Reprovado"


# Executa o programa
if __name__ == "__main__":
    situacao = calcular_situacao_aluno()
    print(f"O aluno está {situacao}.")
