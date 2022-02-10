call kind delete cluster 
call kind create cluster --config .\config\kind-config.yaml
call kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
call kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
call kubectl apply -f .\ingress\ingress.yaml
call kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.4.0/aio/deploy/recommended.yaml
call kubectl apply -f .\dashboard\dashboard-adminuser.yaml