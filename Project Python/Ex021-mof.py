s = str(input("Digite M ou f: \n")).strip().upper()[0]
while s not in "MmFf":
    s=str(input("Caro Asno do krl digite M ou F: \n")).strip().upper()[0]
print("Sexo do(a) fela de uma mãe é {}".format(s))
print(f"Sexo do(a) fela é {s}.")