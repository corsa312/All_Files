num = int(input("Digite o número a ser convertido : \n"))
base = int(input('''Escolha a Base da Conversão :
    Para Binário digite 1
    Para Octal digite 2
    Para Hexadecimal digite 3
    Sua escolha : \n'''))

if base == 1:
    print("Conversão Para Binário")
    print("{} convertido para Binário é: {}.".format(num, bin(num)[2:]))
elif base == 2:
    print("Conversão Para Octal")
    print("{} convertido para Octal é: {}.".format(num, oct(num)[2:]))
elif base == 3:
    print("Conversão Para Hexadecimal")
    print("{} convertido para Hexadecimal é: {}.".format(num, hex(num)[2:]))
else:
    print("Por favor, escolha apenas as opções dadas Seu Animal.")
