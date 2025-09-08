def situacao(nota1, nota2, nota3):
    media = (nota1 + nota2 + nota3) / 3
    if media>= 60:
        return "Aprovado"
    else:
        return "Reprovado"
nota1 = float(input("Digite a Primeira Nota: "))
nota2 = float(input("Digite a Segunda Nota: "))
nota3 = float(input("Digite a Terceira Nota: "))
resultado = situacao(nota1, nota2, nota3)
print(f"O aluno está {resultado}.")
