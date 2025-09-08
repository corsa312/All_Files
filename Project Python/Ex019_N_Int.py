import math
num = float(input("Digite Um Número real: "))

print("O valor digitado é {} e sua porção Inteira é {}".format(num,int(num)))
print("O valor digitado é {} e sua porção Inteira é {}".format(num,math.ceil(num)))
print("O valor digitado é {} e sua porção Inteira é {}".format(num,math.trunc(num)))
print("O valor digitado é {} e sua porção Inteira é {}".format(num,math.floor(num)))