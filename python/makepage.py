# makepage.py


import argparse


default_title = 'my awesome page'
default_body = '''
Here is a bunch of information that will go into the webpage.
'''


parser = argparse.ArgumentParser(description='Process a template.')

parser.add_argument('-o',
                    dest='output',
                    required='true',
                    help='output location to write html file.')

parser.add_argument('input', 
                    help='filename and path of the template to process.')

parser.add_argument('--title', '-t',
                    default=default_title,
                    help='Title of the webpage.')

parser.add_argument('--body', '-b',
                    default=default_body ,
                    help='Body of the webpage.')

args = parser.parse_args()
title = args.title
body = args.body


# Information that gets inserted into the template.



with open(args.input) as f:
    data = f.read()

html_output = data.format(title=title, body=body)


with open(args.output, 'w+') as f:
    f.write(html_output)
