import torch
import torch.nn as nn

class Model(nn.Module):
    def __init__(self, num_channels=3):
        super(Model, self).__init__()
        
        self.conv1 = nn.Conv2d(num_channels, 32, kernel_size=3, stride=1, padding=1)
        self.bn1 = nn.BatchNorm2d(32)
        self.relu1 = nn.ReLU(inplace=True)
        self.pool1 = nn.MaxPool2d(kernel_size=2)
        
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1)
        self.bn2 = nn.BatchNorm2d(64)
        self.relu2 = nn.ReLU(inplace=True)
        self.pool2 = nn.MaxPool2d(kernel_size=2)
        
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1)
        self.bn3 = nn.BatchNorm2d(128)
        self.relu3 = nn.ReLU(inplace=True)
        self.pool3 = nn.MaxPool2d(kernel_size=2)
        
        self.fc1 = nn.Linear(128 * 28 * 28, 128)
        self.fc_bn1 = nn.BatchNorm1d(128)
        self.fc_relu1 = nn.ReLU(inplace=True)
        self.dropout = nn.Dropout(p=0.5)
        
        self.fc2 = nn.Linear(128, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        x = self.pool1(self.relu1(self.bn1(self.conv1(x))))
        x = self.pool2(self.relu2(self.bn2(self.conv2(x))))
        x = self.pool3(self.relu3(self.bn3(self.conv3(x))))
        
        x = x.view(x.size(0), -1)
        x = self.dropout(self.fc_relu1(self.fc_bn1(self.fc1(x))))
        x = self.sigmoid(self.fc2(x))
        
        return x