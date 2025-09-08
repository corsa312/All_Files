idade_str = input("Digite Sua Idade: ")
idade = int(idade_str)
if(idade > 18):
    print("Você é maior de idade.")
else:
    if(idade < 12):
        print("Você é uma criança.")
    elif(idade > 12):
        print("Você é um adolencete.")