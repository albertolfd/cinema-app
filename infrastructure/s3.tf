##############################
# S3 RESOURCES
##############################

resource "aws_s3_bucket" "cinema_app_s3_bucket" {
  bucket        = local.prefix
  acl           = "private"
  force_destroy = true # when running terraform destroy, we want to destroy the bucket and its content

  policy = templatefile("policy.json", {
    BUCKET_NAME    = local.prefix
    CLOUDFRONT_OAI = aws_cloudfront_origin_access_identity.cinema_app_origin_access_identity.iam_arn
  })

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  versioning {
    enabled = true
  }

  tags = local.common_tags
}

resource "aws_s3_bucket_public_access_block" "cinema_app_s3_bucket_block_access" {
  bucket = aws_s3_bucket.cinema_app_s3_bucket

  block_public_acls   = true
  block_public_policy = true
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