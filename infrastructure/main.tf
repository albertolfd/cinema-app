provider "aws" {
  region = "eu-west-3"
}

terraform {
  backend "s3" {
    bucket  = "alberto-cinema-app-tf-state"
    key     = "cinema-app.tfstate"
    region  = "eu-west-3"
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"
  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManagedBy   = "Terraform"
    Owner       = "Alberto Lara García-Casarrubios"
  }
}