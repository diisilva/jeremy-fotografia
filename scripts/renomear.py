import os

def renomear_e_mudar_extensao(pasta):
    # Lista todos os arquivos na pasta
    arquivos = [f for f in os.listdir(pasta) if os.path.isfile(os.path.join(pasta, f))]
    
    # Ordena os arquivos para garantir uma renomeação consistente
    arquivos.sort()
    
    # Renomeia cada arquivo e muda a extensão para .jpg
    for i, arquivo in enumerate(arquivos, start=1):
        nome_antigo = os.path.join(pasta, arquivo)
        nome_novo = os.path.join(pasta, f"{i}.jpg")
        
        # Apenas renomeia se o nome antigo e o novo são diferentes
        if nome_antigo != nome_novo:
            # Remove o arquivo de destino se ele já existir
            if os.path.exists(nome_novo):
                os.remove(nome_novo)
            
            # Renomeia o arquivo
            os.rename(nome_antigo, nome_novo)
            print(f"Renomeado: {nome_antigo} -> {nome_novo}")
    
    # Exclui arquivos que não são JPG (exceto os já renomeados)
    arquivos_atualizados = [f for f in os.listdir(pasta) if os.path.isfile(os.path.join(pasta, f))]
    for arquivo in arquivos_atualizados:
        if not arquivo.lower().endswith('.jpg'):
            os.remove(os.path.join(pasta, arquivo))
            print(f"Excluído: {os.path.join(pasta, arquivo)}")

# Caminho da pasta onde os arquivos estão localizados
pasta = r'F:\Univali\note_cootra\jeremy-fotografia\images\pororoca'

# Chama a função para renomear os arquivos e mudar a extensão
renomear_e_mudar_extensao(pasta)
