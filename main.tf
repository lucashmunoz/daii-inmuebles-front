terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region     = "us-east-1"
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_ACCESS_KEY
  token      = var.AWS_SESSION_TOKEN
}

# Variable para el nombre de la clave
variable "key_name" {
  description = "El nombre de la clave"
  default     = "smartmove"
}

# Generación de clave privada con TLS
resource "tls_private_key" "rsa_4096" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Crear un par de claves (key pair) en AWS
resource "aws_key_pair" "key_pair" {
  key_name   = var.key_name
  public_key = tls_private_key.rsa_4096.public_key_openssh
}

# Guardar la clave privada localmente
resource "local_file" "private_key" {
  content  = tls_private_key.rsa_4096.private_key_pem
  filename = "${var.key_name}.pem"
}

# Crear una instancia EC2
resource "aws_instance" "Frontend" {
  ami           = "ami-0866a3c8686eaeeba"  # Verifica que esta AMI esté disponible en us-east-1
  instance_type = "t2.micro"
  key_name      = aws_key_pair.key_pair.key_name

  tags = {
    Name = "Frontend"
  }
}
