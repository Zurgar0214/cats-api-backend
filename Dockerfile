FROM public.ecr.aws/lambda/nodejs:18

WORKDIR /var/task

COPY package*.json ./
RUN npm install --production

COPY dist ./dist

CMD ["dist/lambda.handler"]