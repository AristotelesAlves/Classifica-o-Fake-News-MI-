# gunicorn_config.py

# Número de workers - baseado no número de CPUs disponíveis

import os
import multiprocessing

# Bind para usar a porta especificada pelo ambiente
bind = "0.0.0.0:" + str(os.getenv("PORT", 5000))  # Render define a variável PORT

# Número de workers
workers = multiprocessing.cpu_count() * 2 + 1

# Loglevel (info, debug, warning, error, critical)
loglevel = "info"

# Nome da aplicação
worker_class = "sync"  # Pode ser "gevent" ou "eventlet" para aplicações assíncronas
timeout = 120          # Tempo máximo antes de encerrar um worker inativo
