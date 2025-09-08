import statistics
import math


def calcular_media(valores):
    return statistics.mean(valores)


def calcular_mediana(valores):
    return statistics.median(valores)


def calcular_moda(valores):
    return statistics.mode(valores)


def calcular_desvio_padrao(valores):
    return statistics.stdev(valores)


def calcular_distancia(p1, p2):
    return math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)


def main():
    print("Escolha uma opção:")
    print("1. Média")
    print("2. Mediana")
    print("3. Moda")
    print("4. Desvio Padrão")
    print("5. Distância entre 2 pontos")

    opcao = input("Digite o número da opção desejada: ")

    if opcao in ["1", "2", "3", "4"]:
        valores = input("Digite uma lista de números separados por vírgula: ")
        lista = [float(x) for x in valores.split(",")]

        if opcao == "1":
            print("Média:", calcular_media(lista))
        elif opcao == "2":
            print("Mediana:", calcular_mediana(lista))
        elif opcao == "3":
            print("Moda:", calcular_moda(lista))
        elif opcao == "4":
            print("Desvio Padrão:", calcular_desvio_padrao(lista))
    elif opcao == "5":
        x1 = float(input("Digite x1: "))
        y1 = float(input("Digite y1: "))
        x2 = float(input("Digite x2: "))
        y2 = float(input("Digite y2: "))
        print("Distância:", calcular_distancia((x1, y1), (x2, y2)))
    else:
        print("Opção inválida!")


if __name__ == "__main__":
    main()
