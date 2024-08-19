from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from base.models import Product
from base.serializers import ProductSerializer

# login
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['pas'] = "5436656"
        token['staffff'] = user.is_staff
        token['email'] = user.email
        # ...
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# register
@api_view(['POST'])
def register(request):
    user = User.objects.create_user(
                username=request.data['username'],
                email=request.data['email'],
                password=request.data['password']
            )
    user.is_active = True
    user.is_staff = False
    user.save()
    return Response("new user born")

@api_view(['GET'])
def index(req):
    return Response('hello')


@api_view(['GET','POST','DELETE','PUT','PATCH'])
def Products(req,id=-1):
    if req.method =='GET':
        if id > -1:
            try:
                temp_Product=Product.objects.get(id=id)
                return Response (ProductSerializer(temp_Product,many=False).data)
            except Product.DoesNotExist:
                return Response ("not found")
        all_Products=ProductSerializer(Product.objects.all(),many=True).data
        return Response ( all_Products)
    if req.method =='POST':
        tsk_serializer = ProductSerializer(data=req.data)
        if tsk_serializer.is_valid():
            tsk_serializer.save()
            return Response ("post...")
        else:
            return Response (tsk_serializer.errors)
    if req.method =='DELETE':
        try:
            temp_Product=Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response ("not found")    
       
        temp_Product.delete()
        return Response ("del...")
    if req.method =='PUT':
        try:
            temp_Product=Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response ("not found")
       
        ser = ProductSerializer(data=req.data)
        old_Product = Product.objects.get(id=id)
        res = ser.update(old_Product, req.data)
        return Response('upd')