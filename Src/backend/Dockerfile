FROM python:3.10-buster

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

# 필수 종속성 설치
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    gfortran \
    libffi-dev \
    libopenblas-dev \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# numpy와 scipy를 먼저 설치합니다.
RUN pip install --no-cache-dir numpy scipy

# requirements.txt에 나머지 종속성 설치
COPY requirements.txt /app/backend/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/backend/

EXPOSE 8000

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
