import os

def renomear_e_mudar_extensao(pasta):
    # Lista todos os arquivos na pasta
    arquivos = [f for f in os.listdir(pasta) if os.path.isfile(os.path.join(pasta, f))]
    
    # Ordena os arquivos para garantir uma renomeação consistente
    arquivos.sort()
    
    # Renomeia cada arquivo para uma extensão temporária
    for i, arquivo in enumerate(arquivos, start=1):
        nome_antigo = os.path.join(pasta, arquivo)
        nome_temporario = os.path.join(pasta, f"temp_{i}")
        
        # Renomeia para um nome temporário para evitar conflitos
        os.rename(nome_antigo, nome_temporario)
        print(f"Renomeado temporariamente: {nome_antigo} -> {nome_temporario}")
    
    # Lista novamente todos os arquivos na pasta após renomeação temporária
    arquivos_temporarios = [f for f in os.listdir(pasta) if f.startswith('temp_')]
    arquivos_temporarios.sort(key=lambda f: int(f.split('_')[1]))  # Ordena por índice
    
    # Renomeia para o formato final
    for i, arquivo in enumerate(arquivos_temporarios, start=1):
        nome_antigo = os.path.join(pasta, arquivo)
        nome_novo = os.path.join(pasta, f"{i}.jpg")
        
        # Renomeia para o nome final
        os.rename(nome_antigo, nome_novo)
        print(f"Renomeado: {nome_antigo} -> {nome_novo}")

# Caminho da pasta onde os arquivos estão localizados
pasta = r'F:\Univali\note_cootra\jeremy-fotografia\images\surf'

# Chama a função para renomear os arquivos e mudar a extensão
renomear_e_mudar_extensao(pasta)
