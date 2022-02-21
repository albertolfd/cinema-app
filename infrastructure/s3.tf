##############################
# S3 RESOURCES
##############################

resource "aws_s3_bucket" "cinema_app_s3_bucket" {
  bucket        = local.prefix
  force_destroy = true # when running terraform destroy, we want to destroy the bucket and its content

  tags = local.common_tags
}

resource "aws_s3_bucket_acl" "cinema_app_s3_bucket_acl" {
  bucket = aws_s3_bucket.cinema_app_s3_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_policy" "cinema_app_s3_bucket_policy" {
  bucket = aws_s3_bucket.accesslogs_bucket.id
  policy = templatefile("policy.json", {
    BUCKET_NAME    = local.prefix
    CLOUDFRONT_OAI = aws_cloudfront_origin_access_identity.cinema_app_origin_access_identity.iam_arn
  })
}

resource "aws_s3_bucket_versioning" "cinema_app_s3_bucket_versioning" {
  bucket = aws_s3_bucket.cinema_app_s3_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_website_configuration" "cinema_app_s3_bucket_website" {
  bucket = aws_s3_bucket.cinema_app_s3_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "cinema_app_s3_bucket_block_access" {
  bucket = aws_s3_bucket.cinema_app_s3_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# resource "aws_s3_bucket_policy" "cinema_app_s3_bucket_policy" {
#   bucket = aws_s3_bucket.cinema_app_s3_bucket.id

#   policy = <<POLICY
# {
#     "Version": "2012-10-17",
#     "Statement": [
#         {
#             "Sid": "PublicReadGetObject",
#             "Action": [
#                 "s3:GetObject"
#             ],
#             "Effect": "Allow",
#             "Resource": "arn:aws:s3:::${local.prefix}/*",
#             "Principal": "*"
#         }
#     ]
# }
#   POLICY
# }
