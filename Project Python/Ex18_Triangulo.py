a = float(input("Primeiro lado da forma: \n"))
b = float(input("Segundo lado da forma: \n"))
c = float(input("Terceiro lado da forma: \n"))

if (a + b > c) and (a + c > b) and (b + c > a):
    print("O triângulo que existe é um ", end="")
    if a == b == c:
        print("triângulo EQUILÁTERO.")  # equilátero: todos os lados iguais
    elif (a == b) or (a == c) or (b == c):
        print("triângulo ISÓSCELES.")   # isósceles: dois lados iguais
    else:
        print("triângulo ESCALENO.")    # escaleno: todos os lados diferentes
else:
    print("O triângulo inexiste.")