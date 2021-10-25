output "cinema_app_bucket_name" {
  value = aws_s3_bucket.cinema_app_s3_bucket.id
}

output "cinema-app-distribution_id" {
  value = aws_cloudfront_distribution.cinema_app_distribution.id
}

output "cinema-app-distribution_domain_name" {
  value = aws_cloudfront_distribution.cinema_app_distribution.domain_name
}