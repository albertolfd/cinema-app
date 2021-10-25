##############################
# CLOUDFRONT RESOURCES
##############################

resource "aws_cloudfront_distribution" "cinema_app_distribution" {
  origin {
    domain_name = aws_s3_bucket.cinema_app_s3_bucket.bucket_regional_domain_name
    origin_id   = "default-origin"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.cinema_app_origin_access_identity.cloudfront_access_identity_path
    }
  }

  retain_on_delete    = true
  price_class         = "PriceClass_All"
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "default-origin"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    min_ttl                = 0
    default_ttl            = 300
    max_ttl                = 300

    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }
    }
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = local.common_tags
}

resource "aws_cloudfront_origin_access_identity" "cinema_app_origin_access_identity" {

}