terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region                  = "us-east-1"
  shared_credentials_files = ["~/.aws/credentials"]  # Corrige aquí
}

# Variables para las credenciales de AWS
variable "key_name" {
  description = "El nombre de la clave"
  default     = "smartmove"
}

resource "tls_private_key" "rsa_4096" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "key_pair" {
  key_name   = var.key_name
  public_key = tls_private_key.rsa_4096.public_key_openssh
}

resource "local_file" "private_key" {
  content  = tls_private_key.rsa_4096.private_key_pem
  filename = "${var.key_name}.pem"
}

resource "aws_instance" "Frontend" {
  ami           = "ami-0866a3c8686eaeeba" 
  instance_type = "t2.micro"
  key_name      = aws_key_pair.key_pair.key_name

  tags = {
    Name = "Frontend"
  }
}
