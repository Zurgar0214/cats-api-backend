FROM public.ecr.aws/lambda/nodejs:18

WORKDIR /var/task

COPY . .

RUN npm install

COPY dist ./dist

CMD ["dist/main.handler"]