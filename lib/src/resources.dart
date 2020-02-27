// Copyright (c) 2020, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:stagexl/stagexl.dart';

late final ResourceManager _resourceManager;

ResourceManager get resourceManager => _resourceManager;

void initializeResources(ResourceManager resourceManager) {
  _resourceManager = resourceManager;
}
