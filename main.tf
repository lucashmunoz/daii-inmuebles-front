# Definimos el proovedor y la version
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configuramos la region y las credenciales
provider "aws" {
  region = "us-east-1"
  access_key = var.access_key
  secret_key = var.secret_key
  token = var.token
}

# Generamos la clave privada
resource "tls_private_key" "rsa_4096" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Utilizamos esta variable para nombrar en otros recursos la clave ssh
variable "key_name" {
  description = "El nombre de la clave"
  default     = "smartmove"  # Puedes establecer un valor por defecto
}

# Creamos el par de claves para crear la instancia de EC2 
resource "aws_key_pair" "key_pair" {
  key_name   = var.key_name
  public_key = tls_private_key.rsa_4096.public_key_openssh
}

# Guardamos la clave en un archivo .pem
resource "local_file" "private_key" {
  content  = tls_private_key.rsa_4096.private_key_pem
  filename = "${var.key_name}.pem"  # Agregar extensión para mayor claridad
}

# Creamos la instancia de EC2
resource "aws_instance" "Frontend" {
  ami           = "ami-0866a3c8686eaeeba"
  instance_type = "t2.micro"
  key_name      = aws_key_pair.key_pair.key_name

  tags = {
    Name = "Frontend"
  }
}