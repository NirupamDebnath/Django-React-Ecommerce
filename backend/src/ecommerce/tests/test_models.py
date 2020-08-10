# from unittest.mock import patch
from django.test import TestCase
from ecommerce.models import Category, Product

def get_sample_category(title="Coffee"):
    return Category.objects.create(title=title)

class ModelTests(TestCase):
    def test_category_str(self):
        """Test the Category string reprasentation"""
        category = Category.objects.create(title='Vegan')

        self.assertEqual(str(category), category.title)
        
    # # @patch('uuid.uuid4().hex')
    # def test_product_str(self):
    #     """Test the Product string representation"""
        
    #     uuid = 'test-uuid'
    #     # mock_uuid.return_value = uuid
    #     file_path = upload_image_path(None, 'test_image.jpg')
    #     image = SimpleUploadedFile(name='test_image.jpg', content=open(file_path, 'rb').read(), content_type='image/jpeg')
        
    #     product = Product.objects.create(
    #         category         = get_sample_category(),
    #         title            = "Black Coffee", 
    #         description      = "Very Good coffee",
    #         quantity         = 10,
    #         price            = 99,
    #         image            = image,
    #         discount         = 0
    #     )

    #     expected_path = f'products/{uuid}.jpg'

    #     self.assertEqual(str(product), product.title)
    #     self.assertEqual(file_path, expected_path)