# Generated by Django 5.1.4 on 2024-12-08 16:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_content_note_etudes_note_scales'),
    ]

    operations = [
        migrations.RenameField(
            model_name='note',
            old_name='etudes',
            new_name='content',
        ),
        migrations.RemoveField(
            model_name='note',
            name='scales',
        ),
    ]